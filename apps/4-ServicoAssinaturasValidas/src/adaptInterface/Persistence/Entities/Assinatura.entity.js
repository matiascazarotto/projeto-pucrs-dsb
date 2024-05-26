import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('Assinatura')
export class Assinatura {
    @PrimaryGeneratedColumn()
    codigo;
    @Column('int')
    codApp;
    @Column('int')
    codCli;
    @Column('date')
    inicioVigencia;
    @Column('date')
    fimVigencia;
}