import {randomUUID} from "crypto";

export abstract class Entity<T> {
  protected _id: string;
  public _props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this._props = props;
    this._id = id ?? randomUUID();
  }
}
