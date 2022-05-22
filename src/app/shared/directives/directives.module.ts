import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhoneFormatDirective } from "./phone-format/phone-format.directive";
import { TextBgModificatorDirective } from "./text-bg-modificator/text-bg-modificator.directive";
import { DateFormatDirective } from "./date-format.directive";

@NgModule({
  declarations: [
    PhoneFormatDirective,
    TextBgModificatorDirective,
    DateFormatDirective,
  ],
  imports: [CommonModule],
  exports: [
    PhoneFormatDirective,
    TextBgModificatorDirective,
    DateFormatDirective,
  ],
})
export class DirectivesModule {}
