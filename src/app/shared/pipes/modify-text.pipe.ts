import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "modifyText",
})
export class ModifyTextPipe implements PipeTransform {
  transform(value: unknown, ...args: string[]): unknown {
    if (args[0] == "movies") args[0] = "película";
    else if (args[0] == "series") args[0] = "serie";
    else if (args[0] == "episodes") args[0] = "episodio";

    return value + " " + args[0];
  }
}
