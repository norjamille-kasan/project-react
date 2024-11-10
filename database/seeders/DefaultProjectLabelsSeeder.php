<?php

namespace Database\Seeders;

use App\Models\ProjectLabel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultProjectLabelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectLabel::create([
            'name'=> 'bug',
            'color'=> 'dc2626',
        ]);
        ProjectLabel::create([
            'name'=> 'documentation',
            'color'=> '4f46e5',
        ]);
        ProjectLabel::create([
            'name'=> 'duplicate',
            'color'=> '44403c',
        ]);
        ProjectLabel::create([
            'name'=> 'enhancement',
            'color'=> '14b8a6',
        ]);
        ProjectLabel::create([
            'name'=> 'help Wanted',
            'color'=> '16a34a',
        ]);
        ProjectLabel::create([
            'name'=> 'invalid',
            'color'=> 'dc2626',
        ]);
        ProjectLabel::create([
            'name'=> 'question',
            'color'=> 'ca8a04',
        ]);
        ProjectLabel::create([
            'name'=> 'wontfix',
            'color'=> '0284c7',
        ]);
    }
}
