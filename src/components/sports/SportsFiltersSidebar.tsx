"use client";

import { FilterSection, toggleInSet } from "@/components/ui/FilterSection";
import { sportsFixtures, sportsTeams } from "@/lib/data";

export type SportsFilterState = {
  selectedEvents: Set<string>;
  selectedTeams: Set<string>;
  selectedTournaments: Set<string>;
  selectedVenues: Set<string>;
  selectedCities: Set<string>;
  selectedCountries: Set<string>;
};

export function createDefaultSportsFilters(): SportsFilterState {
  return {
    selectedEvents: new Set(["Austria vs Israel"]),
    selectedTeams: new Set(["AUT"]),
    selectedTournaments: new Set(),
    selectedVenues: new Set(),
    selectedCities: new Set(),
    selectedCountries: new Set(),
  };
}

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values));
}

function CheckboxList({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (option: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={selected.has(option)}
            onChange={() => onToggle(option)}
            className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="text-[14px] text-neutral-700">{option}</span>
        </label>
      ))}
    </div>
  );
}

export function SportsFiltersSidebar({
  filters,
  onFiltersChange,
}: {
  filters: SportsFilterState;
  onFiltersChange: (updater: (prev: SportsFilterState) => SportsFilterState) => void;
}) {
  const tournaments = uniqueValues(sportsFixtures.map((fixture) => fixture.tournament));
  const venues = uniqueValues(sportsFixtures.map((fixture) => fixture.venue));
  const cities = uniqueValues(sportsFixtures.map((fixture) => fixture.city));
  const countries = uniqueValues(sportsFixtures.map((fixture) => fixture.country));

  function resetAll() {
    onFiltersChange(() => ({
      selectedEvents: new Set(),
      selectedTeams: new Set(),
      selectedTournaments: new Set(),
      selectedVenues: new Set(),
      selectedCities: new Set(),
      selectedCountries: new Set(),
    }));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 rounded-[8px] border border-[#0000001A] bg-white px-4 py-3.5">
        <span className="text-[16px] font-bold text-neutral-900">Filter Results</span>
        <button
          type="button"
          onClick={resetAll}
          className="text-[13px] font-semibold text-brand-blue hover:underline"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Events Available">
        <CheckboxList
          options={sportsFixtures.map((fixture) => fixture.label)}
          selected={filters.selectedEvents}
          onToggle={(label) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedEvents: toggleInSet(prev.selectedEvents, label),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Teams">
        <div className="flex flex-col gap-2">
          {sportsTeams.map((team) => (
            <label key={team.code} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={filters.selectedTeams.has(team.code)}
                onChange={() =>
                  onFiltersChange((prev) => ({
                    ...prev,
                    selectedTeams: toggleInSet(prev.selectedTeams, team.code),
                  }))
                }
                className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
              />
              <span className="text-[14px] text-neutral-700">
                {team.name} ({team.code})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tournament" defaultOpen={false}>
        <CheckboxList
          options={tournaments}
          selected={filters.selectedTournaments}
          onToggle={(tournament) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedTournaments: toggleInSet(prev.selectedTournaments, tournament),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Venue" defaultOpen={false}>
        <CheckboxList
          options={venues}
          selected={filters.selectedVenues}
          onToggle={(venue) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedVenues: toggleInSet(prev.selectedVenues, venue),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="City" defaultOpen={false}>
        <CheckboxList
          options={cities}
          selected={filters.selectedCities}
          onToggle={(city) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedCities: toggleInSet(prev.selectedCities, city),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Country" defaultOpen={false}>
        <CheckboxList
          options={countries}
          selected={filters.selectedCountries}
          onToggle={(country) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedCountries: toggleInSet(prev.selectedCountries, country),
            }))
          }
        />
      </FilterSection>
    </div>
  );
}
