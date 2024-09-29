"use client";
import { useState, useEffect } from "react";
import { FloatingIndicator, Tabs, ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./tab.module.css";
import { fetchTasks } from "@/utiles/api.axios";
import Tasks from "@/components/Tasks";
import TempViewIfNoDeletedOrDoneTasks from "@/components/TempViewIfNoDoneOrDeleted";
import ViewIfNoTasks from "@/components/ViewIfNoTasks";
import ClearTasksComponent from "@/components/ClearTasks";
import TaskCreationModal from "@/components/taskCreationModal";
import { filterTasks } from "@/utiles/taskPreviewFilteration";
import Filteration from "@/components/Filteration";

export default function Home() {
  // library's state
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("active");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  // Filter state
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string[]>([""]);

  // necessary state
  const [tasks, setTasks] = useState<taskI[]>([]);
  const [activetasks, setActiveTasks] = useState<taskI[]>([]);
  const [doneTasks, setDoneTasks] = useState<taskI[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<taskI[]>([]);

  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const deletedAnnouncement =
    "Deleted tasks will be permanently deleted after 7 days.";

  useEffect(() => {
    fetchTasks("/task").then((data) => {
      if (data) {
        setTasks(data);
      }
    });

    const activeT = tasks.filter((task) => !task.isDone && !task.isDeleted);
    setActiveTasks(activeT);

    const doneT = tasks.filter((task) => task.isDone && !task.isDeleted);
    setDoneTasks(doneT);

    const deletedT = tasks.filter((task) => task.isDeleted);
    setDeletedTasks(deletedT);
  }, [tasks]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "60%",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Tabs variant="none" value={value} onChange={setValue}>
          <Tabs.List ref={setRootRef} className={classes.list}>
            <Tabs.Tab
              value="active"
              ref={setControlRef("active")}
              className={classes.tab}
            >
              My To-Dos
            </Tabs.Tab>
            <Tabs.Tab
              value="done"
              ref={setControlRef("done")}
              className={classes.tab}
            >
              Done To-Dos
            </Tabs.Tab>

            <Tooltip
              label={deletedAnnouncement}
              position="top"
              withArrow
              closeDelay={1000}
              style={{
                backgroundColor: "lightgoldenrodyellow",
                color: "black",
              }}
            >
              <Tabs.Tab
                value="deleted"
                ref={setControlRef("deleted")}
                className={classes.tab}
              >
                Deleted To-Dos
              </Tabs.Tab>
            </Tooltip>
            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>

          {value === "active" && (
            <ClearTasksComponent
              taskType="active"
              tasks={activetasks}
              selectedTimeFrame={selectedTimeFrame}
              setSelectedTimeFrame={setSelectedTimeFrame}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          )}

          {value === "done" && (
            <ClearTasksComponent
              taskType="done"
              tasks={doneTasks}
              selectedTimeFrame={selectedTimeFrame}
              setSelectedTimeFrame={setSelectedTimeFrame}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          )}

          {value === "deleted" && (
            <Filteration
              tasks={deletedTasks}
              selectedTimeFrame={selectedTimeFrame}
              setSelectedTimeFrame={setSelectedTimeFrame}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              margin="95%"
            />
          )}

          <Tabs.Panel value="active">
            {activetasks.length === 0 ? (
              <ViewIfNoTasks setTaskModalOpen={setTaskModalOpen} />
            ) : (
              <Tasks
                tasksProps={filterTasks(
                  activetasks,
                  selectedTimeFrame,
                  selectedLabels
                )}
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="done">
            {doneTasks.length === 0 ? (
              <TempViewIfNoDeletedOrDoneTasks />
            ) : (
              <Tasks
                tasksProps={filterTasks(
                  doneTasks,
                  selectedTimeFrame,
                  selectedLabels
                )}
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="deleted">
            {deletedTasks.length === 0 ? (
              <TempViewIfNoDeletedOrDoneTasks />
            ) : (
              <Tasks
                tasksProps={filterTasks(
                  deletedTasks,
                  selectedTimeFrame,
                  selectedLabels
                )}
                deleted={true}
              />
            )}
          </Tabs.Panel>
        </Tabs>

        <TaskCreationModal
          taskModalOpen={taskModalOpen}
          setTaskModalOpen={setTaskModalOpen}
        />

        <ActionIcon
          size={80}
          color="lightGray"
          variant="outline"
          style={{
            borderRadius: "50%",
            position: "fixed",
            left: "20px",
            bottom: "20px",
            marginBottom: "16px",
          }}
          onClick={() => setTaskModalOpen(true)}
        >
          <IconPlus size={60} />
        </ActionIcon>
      </div>
    </div>
  );
}
