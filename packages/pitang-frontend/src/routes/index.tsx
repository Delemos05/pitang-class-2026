import { createFileRoute } from "@tanstack/react-router";
import Pomodoro from "../App";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Pomodoro />;
}
