'use client';
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {

  const route = useRouter();

  // Function to handle the click event and create a new entry
const handleClick = async () => {
  const data =await createNewEntry();
  route.push(`/journal/${data.id}`);
  }
  
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
