import { Size } from "src/common/enums/sizes.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pets')
export class Pets {
    @PrimaryGeneratedColumn()
    id!: string;
    
    @Column()
    name!: string;
    
    @Column()
    race!: string;
    
    @Column()
    age!: string;
    
    @Column()
    species!: string;
    
    @Column({
        type: 'enum',
        enum: Size
    })
    size!: Size;

    @Column({default:true})
    isActive!: boolean;


}