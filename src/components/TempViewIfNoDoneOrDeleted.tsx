import { Text } from "@mantine/core";

export default function TempViewIfNoDeletedOrDoneTasks() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "50vh",
          color: "lightGray",
        }}
      >
        <Text size="lg">Nothing yet, Break the silence</Text>
      </div>
    );
  }