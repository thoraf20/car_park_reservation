import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Garage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column({ nullable: false })
    postalCode: string;

  @Column({ nullable: false })
    rateCompact: number;

  @Column({ nullable: true })
    rateReg: number;

  @Column({ nullable: true })
    rateLarge: number;

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}