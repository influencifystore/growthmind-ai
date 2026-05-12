import List "mo:core/List";
import Types "types/contact-form";
import ContactFormMixin "mixins/contact-form-api";

actor {
  let submissions = List.empty<Types.ContactSubmission>();
  let counter = { var nextId : Nat = 0 };
  include ContactFormMixin(submissions, counter);
};
