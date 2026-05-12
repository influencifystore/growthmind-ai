import List "mo:core/List";
import Types "../types/contact-form";
import ContactLib "../lib/contact-form";

mixin (
  submissions : List.List<Types.ContactSubmission>,
  counter : { var nextId : Nat },
) {
  public shared func submitContact(input : Types.SubmitContactInput) : async Types.SubmitResult {
    ContactLib.submit(submissions, counter, input);
  };

  public query func getContacts() : async [Types.ContactSubmission] {
    ContactLib.getAll(submissions);
  };
};
