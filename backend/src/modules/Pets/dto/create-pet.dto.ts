import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Species } from 'src/common/enums/species.enum';
import { Ages } from 'src/common/enums/ages.enum';
import { Size } from 'src/common/enums/sizes.enum';

export class CreatePetDto {
    @ApiProperty({ example: 'Max', description: 'Nombre de la mascota' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name!: string;

    @ApiProperty({ example: 'Golden Retriever', description: 'Raza de la mascota' })
    @IsNotEmpty({ message: 'La raza es requerida' })
    @IsString({ message: 'La raza debe ser una cadena de texto' })
    race!: string;

    @ApiProperty({ 
        enum: Ages,
        example: Ages.ADULT, 
        description: 'Edad de la mascota' 
    })
    @IsNotEmpty({ message: 'La edad es requerida' })
    @IsEnum(Ages, { message: 'La edad debe ser un valor válido' })
    age!: Ages;

    @ApiProperty({ 
        enum: Species,
        example: Species.DOG, 
        description: 'Especie de la mascota' 
    })
    @IsNotEmpty({ message: 'La especie es requerida' })
    @IsEnum(Species, { message: 'La especie debe ser un valor válido' })
    species!: Species;

    @ApiProperty({ 
        enum: Size,
        example: Size.MEDIUM, 
        description: 'Tamaño de la mascota' 
    })
    @IsNotEmpty({ message: 'El tamaño es requerido' })
    @IsEnum(Size, { message: 'El tamaño debe ser un valor válido' })
    size!: Size;
}