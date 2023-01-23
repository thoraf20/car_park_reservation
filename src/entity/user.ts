import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column({ nullable: false, unique: true })
    email: string;

  @Column({ nullable: false, unique: true })
    password: string;

  @Column({ nullable: true })
    firstName: string;

  @Column({ nullable: true })
    lastName: string;

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}