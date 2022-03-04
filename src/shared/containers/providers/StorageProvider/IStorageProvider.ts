export interface IStorageProvider {
    save(file_name: string, folder: string): Promise<string>;
    delete(file_name: string, folder: string): Promise<void>;
}
