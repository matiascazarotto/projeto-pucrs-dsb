import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pagamento')
export class Pagamento {
   @PrimaryGeneratedColumn()
   id;
   @Column('int')
   codAss;
   @Column({ type: 'decimal', precision: 10, scale: 2 })
   valorPago;
   @Column('date')
   dataPagamento;
}