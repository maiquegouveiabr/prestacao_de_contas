"use client";
import SelectComponent from "@/components/SelectComponent";
import InputComponent from "@/components/InputComponent";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import InputWithButton from "../components/InputWithButton";
import { PlusIcon } from "lucide-react";
import List from "../components/List";
import type { MediaBaptism, MediaMarkedBaptism, Record } from "@/interfaces";
import useZones from "@/hooks/useZones";
import useAreas from "@/hooks/useAreas";

function App() {
  const { zones, zonesLoading } = useZones();
  const { areas, areasLoading } = useAreas();

  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [zone, setZone] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [bapData, setBapData] = useState<MediaBaptism[]>([]);
  const [bapMarkedData, setBapMarkedData] = useState<MediaMarkedBaptism[]>([]);

  //Record
  const [baptism, setBaptism] = useState<string | null>(null);
  const [markedBaptism, setMarkedBaptism] = useState<string | null>(null);
  const [markedBaptismTotal, setMarkedBaptismTotal] = useState<string | null>(
    null
  );
  const [baptismInvite, setBaptismInvite] = useState<string | null>(null);
  const [friendsSacramentMeeting, setFriendsSacramentMeeting] = useState<
    string | null
  >(null);
  const [newFriends, setNewFriends] = useState<string | null>(null);
  const [contacts, setContacts] = useState<string | null>(null);
  const [memberLessons, setMemberLessons] = useState<string | null>(null);
  const [convertLessons, setConvertLessons] = useState<string | null>(null);
  const [convertsSacramentMeeting, setConvertsSacramentMeeting] = useState<
    string | null
  >(null);
  const [convertsTemple, setConvertsTemple] = useState<string | null>(null);
  const [sacramentMeetingAttendance, setSacramentMeetingAttendance] = useState<
    string | null
  >(null);
  const [mediaFriendsSacramentMeeting, setMediaFriendsSacramentMeeting] =
    useState<string | null>(null);

  // This will reset the state of "area"
  useEffect(() => {
    setArea("");
  }, [zone]);

  useEffect(() => {
    if (area) {
      setFieldsDisabled(false);
    }
  }, [area]);

  // This will check if all fields are filled and enable send button if so
  useEffect(() => {
    if (
      baptism &&
      markedBaptism &&
      markedBaptismTotal &&
      baptismInvite &&
      friendsSacramentMeeting &&
      newFriends &&
      contacts &&
      memberLessons &&
      convertLessons &&
      convertsSacramentMeeting &&
      convertsTemple &&
      sacramentMeetingAttendance &&
      mediaFriendsSacramentMeeting
    ) {
      setSendDisabled(false);
    } else {
      setSendDisabled(true);
    }
  }, [
    baptism,
    markedBaptism,
    markedBaptismTotal,
    baptismInvite,
    friendsSacramentMeeting,
    newFriends,
    contacts,
    memberLessons,
    convertLessons,
    convertsSacramentMeeting,
    convertsTemple,
    sacramentMeetingAttendance,
    mediaFriendsSacramentMeeting,
  ]);

  const handleDeleteBaptism = (id: number) => {
    const arr = bapData.filter((item) => item.id !== id);
    setBapData(arr);
  };

  const handleAddBaptism = (value: string) => {
    const id = Math.random() * 100;
    setBapData((prev) => [...prev, { id, value }]);
  };

  const handleDeleteMarkedBaptism = (id: number) => {
    const arr = bapMarkedData.filter((item) => item.id !== id);
    setBapMarkedData(arr);
  };

  const handleAddMarkedBaptism = (value: string) => {
    const id = Math.random() * 100;
    setBapMarkedData((prev) => [...prev, { id, value }]);
  };

  const handleSave = () => {
    const data: Record = {
      areaId: Number(area),
      baptism: Number(baptism),
      baptismInvite: Number(baptismInvite),
      contacts: Number(contacts),
      convertLessons: Number(convertLessons),
      convertsSacramentMeeting: Number(convertsSacramentMeeting),
      convertsTemple: Number(convertsTemple),
      friendsSacramentMeeting: Number(friendsSacramentMeeting),
      markedBaptism: Number(markedBaptism),
      markedBaptismTotal: Number(markedBaptismTotal),
      mediaBaptisms: bapData,
      mediaFriendsSacramentMeeting: Number(mediaFriendsSacramentMeeting),
      mediaMarkedBaptisms: bapMarkedData,
      memberLessons: Number(memberLessons),
      newFriends: Number(newFriends),
    };

    console.log(data);
  };
  // Memoized values
  const filteredAreas = useMemo(() => {
    return areas
      .filter((area) => area.zone_id === Number(zone))
      .map((area) => ({
        label: area.name,
        value: area.id,
      }));
  }, [areas, zone]);

  const zoneOptions = useMemo(() => {
    return zones.map((zone) => ({ label: zone.name, value: zone.zone_id }));
  }, [zones]);
  if (zonesLoading || areasLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-[600px] w-full rounded mx-auto p-4">
      <div className="text-left">
        <h1 className="pt-3 font-semibold text-[28px]">
          Prestação de Contas - 2025
        </h1>
        <h4 className="pt-3 font-semibold text-justify">
          Relate aqui o resultado da última semana de trabalho. Utilize os
          indicadores-chaves no aplicativo *Pregar Meu Evangelho* para ajudá-lo.
        </h4>
      </div>
      <hr className="my-3 border-t border-[#242424]" />
      <div className="flex flex-col gap-4">
        <SelectComponent
          value={zone}
          onChange={setZone}
          label="Qual é a sua zona?"
          selectLabel="Zonas"
          items={zoneOptions}
          required
        />
        <SelectComponent
          value={area}
          onChange={setArea}
          label="Qual é a sua área de ensino?"
          selectLabel="Áreas de Ensino"
          items={filteredAreas}
          required
          disabled={zone === "" ? true : false}
        />
        <InputComponent
          value={baptism}
          setValue={setBaptism}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos batismos?"
          required
        />
        <InputComponent
          value={markedBaptism}
          setValue={setMarkedBaptism}
          disabled={fieldsDisabled}
          type="number"
          label="Quantas datas marcadas?"
          required
        />
        <InputComponent
          value={markedBaptismTotal}
          setValue={setMarkedBaptismTotal}
          disabled={fieldsDisabled}
          type="number"
          label="Quantas datas totais?"
          required
        />
        <InputComponent
          value={baptismInvite}
          setValue={setBaptismInvite}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos convites batismais?"
          required
        />
        <InputComponent
          value={friendsSacramentMeeting}
          setValue={setFriendsSacramentMeeting}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos pesquisadores na igreja?"
          required
        />
        <InputComponent
          value={newFriends}
          setValue={setNewFriends}
          disabled={fieldsDisabled}
          type="number"
          label="Quantas novas pessoas sendo ensinadas?"
          required
        />
        <InputComponent
          value={contacts}
          setValue={setContacts}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos contatos?"
          required
        />
        <InputComponent
          value={memberLessons}
          setValue={setMemberLessons}
          disabled={fieldsDisabled}
          type="number"
          label="Quantas lições com membro participando?"
          required
        />
        <InputComponent
          value={convertLessons}
          setValue={setConvertLessons}
          disabled={fieldsDisabled}
          type="number"
          label="Quantas lições para recém conversos?"
          required
        />
        <InputComponent
          value={convertsSacramentMeeting}
          setValue={setConvertsSacramentMeeting}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos recém conversos na reunião sacramental?"
          required
        />
        <InputComponent
          value={convertsTemple}
          setValue={setConvertsTemple}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos recém conversos no templo?"
          required
        />
        <InputComponent
          value={sacramentMeetingAttendance}
          setValue={setSacramentMeetingAttendance}
          disabled={fieldsDisabled}
          type="number"
          label="Qual foi a frequência na reunião sacramental?"
          required
        />
        <InputComponent
          value={mediaFriendsSacramentMeeting}
          setValue={setMediaFriendsSacramentMeeting}
          disabled={fieldsDisabled}
          type="number"
          label="Quantos pesquisadores na igreja do Facebook?"
          required
        />
        <InputWithButton
          disabled={fieldsDisabled}
          type="text"
          label="Batismos do Facebook"
          btnText={<PlusIcon />}
          required={false}
          onClick={handleAddBaptism}
        />
        {bapData.length > 0 && (
          <List data={bapData} onDelete={handleDeleteBaptism} />
        )}
        <InputWithButton
          disabled={fieldsDisabled}
          type="text"
          label="Datas do Facebook"
          btnText={<PlusIcon />}
          required={false}
          onClick={handleAddMarkedBaptism}
        />
        {bapMarkedData.length > 0 && (
          <List data={bapMarkedData} onDelete={handleDeleteMarkedBaptism} />
        )}
        <Button
          disabled={sendDisabled}
          onClick={handleSave}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default App;
