<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BannerResource\Pages;
use App\Models\Banner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Site Content';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hero Slide Content')
                    ->schema([
                        Forms\Components\TextInput::make('badge')
                            ->placeholder('e.g. TRIPLE-LENS CAMERA DRONE')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->placeholder('e.g. AERO MAVIC 4 PRO')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('subtitle')
                            ->columnSpanFull()
                            ->placeholder('e.g. Inspiration in Focus — 4K/120fps Hasselblad Cinema System'),
                        Forms\Components\TextInput::make('image_url')
                            ->label('Background Image URL')
                            ->required()
                            ->placeholder('https://images.unsplash.com/...'),
                        Forms\Components\TextInput::make('bg_video_url')
                            ->label('Background Video URL (Optional)')
                            ->placeholder('https://...'),
                    ])->columns(2),

                Forms\Components\Section::make('Call to Action & Controls')
                    ->schema([
                        Forms\Components\TextInput::make('cta_text')
                            ->default('Learn More')
                            ->required(),
                        Forms\Components\TextInput::make('cta_link')
                            ->default('/products')
                            ->required(),
                        Forms\Components\TextInput::make('cta_secondary_text')
                            ->default('Buy Now'),
                        Forms\Components\TextInput::make('cta_secondary_link'),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active on Slider')
                            ->default(true),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_url')
                    ->label('Banner Preview')
                    ->width(120)
                    ->height(60),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('badge')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('cta_text')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
    }
}
