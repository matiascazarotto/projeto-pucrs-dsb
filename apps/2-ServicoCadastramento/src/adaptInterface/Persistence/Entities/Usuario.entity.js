import { Entity } from 'typeorm';
import { Column, PrimaryColumn } from 'typeorm';

@Entity('Usuario')
export class Usuario {
    @PrimaryColumn('varchar')
    usuario;
    @Column('varchar')
    senha;
}