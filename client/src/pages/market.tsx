import { useMarketPlayer } from "@/api";
import HistoryButton from "@/components/history-button";
import { PlayerCard } from "@/components/player-card";
import { IPlayerPopulated } from "@/lib/interfaces";
import { LoaderCircle } from "lucide-react";

const Market = () => {
  const { data, isLoading } = useMarketPlayer();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        <HistoryButton /> Market
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((player: IPlayerPopulated) => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Market;
