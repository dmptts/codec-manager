import { IMethod } from './method';

export interface ICodec {
  id: number;
  extends_id: number;
  name: string;
  description: string;
  status: null | number;
  created_at: string;
  updated_at: string;
}

export interface ICodecFull extends ICodec {
  methods: IMethod[];
}
