<?php

namespace App\Enum;

enum TaskStatus: string
{
    case TRIAGE = "triage";
    case BACKLOG = "backlog";
    case TODO = "todo";
    case IN_PROGRESS = "in_progress";
    case IN_REVIEW = "in_review";
    case DONE = "done";
    case CANCELLED = "cancelled";

    public function label(): string
    {
        return match ($this) {
            self::TRIAGE => "Triage",
            self::BACKLOG => "Backlog",
            self::TODO => "Todo",
            self::IN_PROGRESS => "In Progress",
            self::IN_REVIEW => "In Review",
            self::DONE => "Done",
            self::CANCELLED => "Cancelled",
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::TRIAGE => "stone",
            self::BACKLOG => "slate",
            self::TODO => "cyan",
            self::IN_PROGRESS => "warning",
            self::IN_REVIEW => "amber",
            self::DONE => "success",
            self::CANCELLED => "slate",
        };
    }
}