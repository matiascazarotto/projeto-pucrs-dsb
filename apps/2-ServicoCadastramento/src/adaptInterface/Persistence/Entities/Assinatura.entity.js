import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Aplicativo } from './Aplicativo.entity';
import { Cliente } from './Cliente.entity';

@Entity('Assinatura')
export class Assinatura {
    @PrimaryGeneratedColumn()
    codigo;
    @ManyToOne(() => Aplicativo, {eager:true, nullable: false})
    codApp;
    @ManyToOne(() => Cliente, {eager:true, nullable: false})
    codCli;
    @Column('date')
    inicioVigencia;
    @Column('date')
    fimVigencia;
}