<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('project_id')->references('id')->on('projects');
            $table->foreignId('author_id')->references('id')->on('users');
            $table->string('ref');
            $table->text('title');
            $table->longText('description')->nullable();
            $table->string('status');
            $table->string('priority_level');
            $table->foreignId('project_label_id')->references('id')->on('project_labels');
            $table->timestamp('date_start')->nullable();
            $table->timestamp('date_end')->nullable();
            $table->timestamp('due_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
