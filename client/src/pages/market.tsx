import { useMarketPlayer } from "@/api";
import { EmptyMarketState } from "@/components/empty-state";
import HistoryButton from "@/components/history-button";
import { PlayerCard } from "@/components/player-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMarketFilter } from "@/hooks/use-market-filters";
import { PLAYERS_ROLES } from "@/lib/contants";
import { IPlayerPopulated } from "@/lib/interfaces";
import { Eraser, LoaderCircle } from "lucide-react";

const Market = () => {
  const { data, isLoading } = useMarketPlayer();
  const [query, setQuery] = useMarketFilter();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        <HistoryButton /> Market
      </h2>
      <div className="max-w-screen-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          className="w-full"
          type="text"
          placeholder="Search by player name..."
          value={query.name}
          onChange={(event) => setQuery({ ...query, name: event.target.value })}
        />
        <Input
          className="w-full"
          type="text"
          placeholder="Search by team name..."
          value={query.team}
          onChange={(event) => setQuery({ ...query, team: event.target.value })}
        />
        <div className="flex items-center gap-2">
          <Select
            value={query.role}
            onValueChange={(value) => setQuery({ ...query, role: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {Object.entries(PLAYERS_ROLES).map(([key, role]) => (
                  <SelectItem key={key} value={role.toLowerCase()}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuery({ ...query, role: "" })}
                aria-label="Clear Role Filter"
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Role Filter</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>
      ) : data?.length === 0 ? (
        <EmptyMarketState />
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
