<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppLogRequest;
use App\Http\Requests\UpdateAppLogRequest;
use App\Models\AppLog;
use Inertia\Inertia;

class AppLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Admin/Logs/Index", [
            "logs" => AppLog::orderBy("created_at", "DESC")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppLogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AppLog $appLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AppLog $appLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppLogRequest $request, AppLog $appLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AppLog $appLog)
    {
        //
    }
}
