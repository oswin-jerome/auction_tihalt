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
        Schema::create('auctions', function (Blueprint $table) {
            $table->id();
            $table->string('product_name', 255);
            $table->text('product_description')->nullable();
            $table->string('product_image_url', 255)->nullable();
            $table->decimal('starting_price', 10, 2);
            $table->decimal('joining_fee', 10, 2);
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->enum('status', ['active', 'completed'])->default('active');
            $table->unsignedBigInteger("winner_id")->nullable();

            $table->foreign("winner_id")->references("id")->on("users");


            $table->timestamps();
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auctions');
    }
};
