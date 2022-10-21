// Projectの定義
const projectSchema = {
  name: 'Project',
  primaryKey: '_id',
  properties: {
    _id: 'int', // 'string' や 'int' でも OK
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
    _id: 'int',
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
    _id: 'int',
    startTime: 'date?',
    inActive: 'bool',
    endTime: 'date?',
    pauseTime: 'date?',
    workTime: 'int?',
    isSaved: 'bool',
    createdAt: 'date',
  },
};

// Realmの初期化
export const openRealm = (): Realm => {
  const config = {
    schema: [projectSchema, taskSchema, workSchema],
    schemaVersion: 20, // スキーマを変更したらインクリメントする
  };

  return new Realm(config);
};

export { BSON } from 'realm';
