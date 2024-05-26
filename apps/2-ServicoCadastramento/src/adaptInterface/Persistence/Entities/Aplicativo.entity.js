import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Aplicativo')
export class Aplicativo {
    @PrimaryGeneratedColumn()
    codigo;
    @Column('varchar')
    nome;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    custoMensal;
}