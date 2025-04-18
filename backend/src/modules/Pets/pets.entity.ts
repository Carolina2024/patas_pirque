import { Ages } from "src/common/enums/ages.enum";
import { Size } from "src/common/enums/sizes.enum";
import { Species } from "src/common/enums/species.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pets')
export class Pets {
    @PrimaryGeneratedColumn()
    id!: string;
    
    @Column()
    name!: string;
    
    @Column()
    race!: string;
    
    @Column({
        type: 'enum',
        enum: Ages
    })
    age!: Ages;
    
    @Column({
        type: 'enum',
        enum: Species
    })
    species!: Species;
    
    @Column({
        type: 'enum',
        enum: Size
    })
    size!: Size;

    @Column({default:true})
    isActive!: boolean;


}