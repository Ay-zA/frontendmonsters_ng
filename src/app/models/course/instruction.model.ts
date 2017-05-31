interface IInstruction {
  instruction?: string;
  state?: number;
  hint?: string;
  isHintVisible?: boolean;
  result?: boolean;
  $editMode?: boolean;
}

export class Instruction {
  public instruction: string;
  public state: number;
  public hint?: string;
  public isHintVisible: boolean;
  public result?: any;
  public $editMode?: boolean;

  constructor(instruction: IInstruction) {
    this.instruction = instruction.instruction || '';
    this.state = instruction.state || 0;
    this.hint = instruction.hint;
    this.isHintVisible = false;
    this.result = instruction.result;
    this.$editMode = instruction.$editMode || false;
  }
}
