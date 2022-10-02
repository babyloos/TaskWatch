import { Realm } from '@realm/react';
export class Project extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;
  userId!: string;

  static generate(name: string, description: string, userId?: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      description,
      createdAt: new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      description: 'string',
      createdAt: 'date',
    },
  };
}
