// Taskの定義
const taskSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'objectId', // 'string' や 'int' でも OK
    name: 'string',
    description: 'string?', // ?をつけると optional
    isDone: 'bool',
    createdAt: 'date',
    subTasks: 'SubTask[]', // クラス名 + '[]' で1対多のリレーションを設定できる
  },
};

// SubTaskの定義
const subTaskSchema = {
  name: 'SubTask',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    isDone: 'bool',
    createdAt: 'date',
  },
};

// Realmの初期化
export const openRealm = (): Realm => {
  const config = {
    schema: [taskSchema, subTaskSchema],
    schemaVersion: 1, // スキーマを変更したらインクリメントする(後述)
  };

  return new Realm(config);
};

export {BSON} from 'realm';
