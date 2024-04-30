import { v4 as uuidv4 } from 'uuid';
export type UUID = string & { _uuidBrand: never };

let existingUUIDs: UUID[] = []; // 既存のUUIDを保存する配列

export const generateUUID = () => {
    let uuid: UUID = uuidv4() as UUID;
    while (existingUUIDs.includes(uuid)) {
        // 既存のUUIDと重複する場合は新しいUUIDを生成
        uuid = uuidv4() as UUID;
    }
    // 重複しないUUIDが生成されたら配列に追加
    existingUUIDs.push(uuid);
    return uuid as UUID;
};
