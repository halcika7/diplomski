export interface FileType {
  name: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileTypeFront extends FileType {
  _id: string;
  orderedBy: { name: string; _id: string };
}
