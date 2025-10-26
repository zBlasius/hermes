import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_TASK_IDENTIFIER = "background-task";

// Here is the function that will be called when the background task is executed
TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  // Pq não ta caindo aqui? Pois não funciona no expo go, somente em build (usar eas build para testar)
  try {
    const now = Date.now();
    console.log(
      `Got background task call at date: ${new Date(now).toISOString()}`
    );
  } catch (error) {
    console.error("Failed to execute the background task:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

export async function syncDataIntoCloudDatabase() {
  // Implement your data synchronization logic here.
  console.log("Syncing data in the background...");
}

export async function registerBackgroundTask() {
  // Exemplo para registrar task com um intervalo mínimo
  console.log("entrou no registerBackgroundTask()");
  await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER, {
    minimumInterval: 60, // seconds
  });
}

export async function registerBackgroundTaskAsync() {
  // Exemplo para registrar task com um intervalo mínimo
  console.log("registrou aqui");
  return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

export async function unregisterBackgroundTaskAsync() {
  // Exemplo para remover o registro de uma task
  return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

export const triggerTask = async () => {
  console.log("entrou aqui");
  await registerBackgroundTaskAsync();
};

export async function syncWithCloudDatabase() {
  console.log("Sincronizando dados com o banco de dados na nuvem...");
}
