import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Species } from 'src/common/enums/species.enum';
import { Ages } from 'src/common/enums/ages.enum';
import { Size } from 'src/common/enums/sizes.enum';

export class FindPetsDto {
    @ApiPropertyOptional({ description: 'Página actual' })
    @Type(() => Number)
    @IsInt({ message: 'La página debe ser un número entero' })
    @Min(1, { message: 'La página debe ser mayor a 0' })
    @IsOptional()
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Cantidad de elementos por página' })
    @Type(() => Number)
    @IsInt({ message: 'El límite debe ser un número entero' })
    @Min(1, { message: 'El límite debe ser mayor a 0' })
    @IsOptional()
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Buscar por nombre' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ description: 'Buscar por raza' })
    @IsString()
    @IsOptional()
    race?: string;

    @ApiPropertyOptional({ enum: Species, description: 'Filtrar por especie' })
    @IsEnum(Species)
    @IsOptional()
    species?: Species;

    @ApiPropertyOptional({ enum: Ages, description: 'Filtrar por edad' })
    @IsEnum(Ages)
    @IsOptional()
    age?: Ages;

    @ApiPropertyOptional({ enum: Size, description: 'Filtrar por tamaño' })
    @IsEnum(Size)
    @IsOptional()
    size?: Size;
}