import { CreateDateColumn, DeleteDateColumn, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int4' })
    id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'now()',
  })
    created_at: Date;

 @UpdateDateColumn({
   type: 'timestamptz',
   default: () => 'now()',
   onUpdate: 'now()',
 })
   updated_at: Date;
}
