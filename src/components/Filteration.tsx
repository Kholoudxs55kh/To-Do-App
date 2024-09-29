import { Menu, ActionIcon, Checkbox, MultiSelect } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

const labelOptions = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "study", label: "Study" },
  { value: "entertainment", label: "Entertainment" },
  { value: "family", label: "Family" },
  { value: "shopping", label: "Shopping" },
  { value: "others", label: "Others" },
];

export default function Filteration({
  tasks,
  selectedTimeFrame,
  setSelectedTimeFrame,
  selectedLabels,
  setSelectedLabels,
  margin = "10px",
}: {
  tasks: taskI[];
  selectedTimeFrame: string[];
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLabels: string[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<string[]>>;
    margin?: string;
}) {
  return (
    <Menu
      shadow="md"
      width={200}
      closeOnItemClick={false}
      disabled={tasks.length === 0}
    >
      <Menu.Target>
        <ActionIcon
          variant="filled"
          color="blue"
          size="lg"
          style={{ marginLeft: margin  }}
        >
          <IconFilter size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Filter by Time</Menu.Label>
        <Menu.Item>
          <Checkbox.Group
            value={selectedTimeFrame.length > 0 ? selectedTimeFrame : undefined}
            onChange={setSelectedTimeFrame}
          >
            <Checkbox value="today" label="Today" />
            <Checkbox value="yesterday" label="Yesterday" />
            <Checkbox value="thisWeek" label="This Week" />
            <Checkbox value="olderWeek" label="Older than a Week" />
            <Checkbox value="olderMonth" label="Older than a Month" />
          </Checkbox.Group>
          <Menu.Label style={{ width: "75%" }}>Filter by Labels</Menu.Label>
          <Menu.Item style={{ width: "75%", backgroundColor: "transparent" }}>
            <MultiSelect
              data={labelOptions}
              placeholder="Select labels"
              value={selectedLabels}
              onChange={setSelectedLabels}
              style={{ width: "65%" }}
              disabled={tasks.length === 0}
            />
          </Menu.Item>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
