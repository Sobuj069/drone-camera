<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Site Content';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Story Details')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('category_tag')
                            ->placeholder('e.g. Industry Insight Report, Engineering & Tech')
                            ->default('Innovation'),
                        Forms\Components\TextInput::make('read_time')
                            ->default('4 min read'),
                        Forms\Components\TextInput::make('image_url')
                            ->label('Cover Image URL')
                            ->required()
                            ->placeholder('https://images.unsplash.com/...'),
                        Forms\Components\DateTimePicker::make('published_at')
                            ->default(now()),
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Highlight on Homepage Forefront Section')
                            ->default(false),
                    ])->columns(2),

                Forms\Components\Section::make('Article Content')
                    ->schema([
                        Forms\Components\Textarea::make('subtitle')
                            ->label('Short Subtitle / Deck')
                            ->rows(2),
                        Forms\Components\Textarea::make('excerpt')
                            ->label('Summary Excerpt')
                            ->rows(3),
                        Forms\Components\Textarea::make('content')
                            ->label('Full Story Body')
                            ->rows(8),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_url')
                    ->label('Cover')
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(40),
                Tables\Columns\TextColumn::make('category_tag')
                    ->badge(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
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
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
