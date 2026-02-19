import { TinyTypeOf } from 'tiny-types';

export const XNKID_ONLINE: bigint = 0xaen;
export const XNKID_SYSTEM_LINK: bigint = 0x00n;
export const XNKID_SERVER: bigint = 0xc0n;

// Change base type to number/same as TitleId?

export default class SessionId extends TinyTypeOf<string>() {
  public constructor(value: string) {
    if (!/^[0-9A-Fa-f]+$/.test(value) || value.length != 16) {
      throw new Error('Invalid SessionId ' + value);
    }

    super(value.toLowerCase());
  }

  public GetBigInt(): bigint {
    return BigInt(`0x${this.value}`);
  }

  public GetSessionTypeMask(): bigint {
    return (this.GetBigInt() >> 56n) & 0xffn;
  }

  public IsOnline(): boolean {
    return this.GetSessionTypeMask() === XNKID_ONLINE;
  }

  public IsSystemLink(): boolean {
    return this.GetSessionTypeMask() === XNKID_SYSTEM_LINK;
  }

  public IsServer(): boolean {
    return this.GetSessionTypeMask() === XNKID_SERVER;
  }

  public GetTypeString(): string {
    if (this.IsOnline()) {
      return 'Xbox Live';
    } else if (this.IsSystemLink()) {
      return 'Systemlink';
    } else if (this.IsServer()) {
      return 'Server';
    } else {
      return 'Unknown';
    }
  }
}
