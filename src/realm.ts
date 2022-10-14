// Projectの定義
const projectSchema = {
  name: 'Project',
  primaryKey: '_id',
  properties: {
    _id: 'objectId', // 'string' や 'int' でも OK
    name: 'string',
    description: 'string?', // ?をつけると optional
    tasks: 'Task[]', // クラス名 + '[]' で1対多のリレーションを設定できる
    createdAt: 'date',
  },
};

// SubTaskの定義
const taskSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    description: 'string?',
    works: 'Work[]',
    createdAt: 'date',
  },
};

// Workの定義
const workSchema = {
  name: 'Work',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    startTime: 'date?',
    inActive: 'bool',
    endTime: 'date?',
    pauseTime: 'date?',
    workTime: 'int?',
    createdAt: 'date',
  },
};

// Realmの初期化
export const openRealm = (): Realm => {
  const config = {
    schema: [projectSchema, taskSchema, workSchema],
    schemaVersion: 11, // スキーマを変更したらインクリメントする
  };

  return new Realm(config);
};

export { BSON } from 'realm';
