import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { startClock } from "react-native-reanimated";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldTask) => [...oldTask, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    const selectedTask = updateTasks.find((item) => item.id === id);
    if (!selectedTask) return;
    selectedTask.done = !selectedTask.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldTask) => oldTask.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
