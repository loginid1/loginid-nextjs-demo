import { JSONFileSyncPreset } from 'lowdb/node'

export interface Session {
    uid: string;
    username: string;
    token: string
}

interface User {
    username: string;
}

interface Data {
    sessions: Session[];
    users: User[];
}

const defaultData: Data = { 
    sessions: [],
    users: []
}

export default JSONFileSyncPreset<Data>('db.json', defaultData);
