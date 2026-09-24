<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationGroup = 'Catalog Management';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Basic Product Details')
                            ->schema([
                                Forms\Components\Select::make('category_id')
                                    ->relationship('category', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload(),
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->lazy(),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('tagline')
                                    ->placeholder('e.g. Inspiration in Focus')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('subtitle')
                                    ->columnSpanFull()
                                    ->placeholder('e.g. Tri-Camera Hasselblad Optical System'),
                                Forms\Components\TextInput::make('badge')
                                    ->placeholder('e.g. Triple-Lens Flagship, New'),
                            ])->columns(2),

                        Forms\Components\Section::make('Pricing & Visibility')
                            ->schema([
                                Forms\Components\TextInput::make('price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('$'),
                                Forms\Components\TextInput::make('original_price')
                                    ->numeric()
                                    ->prefix('$'),
                                Forms\Components\Toggle::make('is_featured')
                                    ->label('Feature on Homepage')
                                    ->default(false),
                                Forms\Components\Toggle::make('is_hero')
                                    ->label('Include in Hero Highlights')
                                    ->default(false),
                                Forms\Components\TextInput::make('order')
                                    ->numeric()
                                    ->default(0),
                            ])->columns(3),

                        Forms\Components\Section::make('Description & Technical Data')
                            ->schema([
                                Forms\Components\Textarea::make('description')
                                    ->rows(4)
                                    ->columnSpanFull(),
                                Forms\Components\KeyValue::make('specs')
                                    ->label('Technical Specifications')
                                    ->keyLabel('Specification')
                                    ->valueLabel('Value')
                                    ->columnSpanFull(),
                            ]),
                    ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Media & 3D Settings')
                            ->schema([
                                Forms\Components\TextInput::make('thumbnail_url')
                                    ->label('Cover Image URL')
                                    ->placeholder('https://...'),
                                Forms\Components\TextInput::make('model_3d_type')
                                    ->label('3D Model Type')
                                    ->default('quadcopter_flagship')
                                    ->helperText('Type used for Three.js 3D viewer rendering'),
                                Forms\Components\TagsInput::make('gallery')
                                    ->label('Image Gallery URLs')
                                    ->placeholder('Add image URL'),
                            ]),
                    ])->columnSpan(['lg' => 1]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail_url')
                    ->label('Thumbnail')
                    ->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('category.name')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->money('USD')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\IconColumn::make('is_hero')
                    ->boolean()
                    ->label('Hero'),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->relationship('category', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
