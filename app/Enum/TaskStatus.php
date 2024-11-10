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

}
