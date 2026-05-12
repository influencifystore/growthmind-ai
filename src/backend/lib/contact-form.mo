import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/contact-form";

module {
  public func submit(
    submissions : List.List<Types.ContactSubmission>,
    counter : { var nextId : Nat },
    input : Types.SubmitContactInput,
  ) : Types.SubmitResult {
    if (input.name == "") {
      return #err "Name is required";
    };
    if (input.email == "") {
      return #err "Email is required";
    };
    if (input.message == "") {
      return #err "Message is required";
    };
    let id = counter.nextId;
    counter.nextId += 1;
    let entry : Types.ContactSubmission = {
      id;
      name = input.name;
      email = input.email;
      company = input.company;
      message = input.message;
      timestamp = Time.now();
    };
    submissions.add(entry);
    #ok "Thank you for reaching out! We\'ll be in touch soon.";
  };

  public func getAll(
    submissions : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmission] {
    submissions.toArray();
  };
};
