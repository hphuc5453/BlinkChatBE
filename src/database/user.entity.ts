import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
 @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({default: ''})
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'text' })
  token: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;
}