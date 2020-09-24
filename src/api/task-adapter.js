import Api from './index';

export default class TaskAdapter extends Api {
  getTasks() {
    return super.getTasks()
      .then((tasks) => tasks.map(this._adaptToClient));
  }

  addTask() {
    return super.addTask()
      .then(this._adaptToClient);
  }

  _adaptToClient(task) {
    const adaptedTask = Object.assign(
        {},
        task,
        {
          dueDate: task.due_date !== null ? new Date(task.due_date) : task.due_date, // На клиенте дата хранится как экземпляр Date
          isArchive: task.is_archived,
          isFavorite: task.is_favorite,
          repeating: task.repeating_days
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.due_date;
    delete adaptedTask.is_archived;
    delete adaptedTask.is_favorite;
    delete adaptedTask.repeating_days;

    return adaptedTask;
  }


}
