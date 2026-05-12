module {
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
    timestamp : Int;
  };

  public type SubmitContactInput = {
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
  };

  public type SubmitResult = {
    #ok : Text;
    #err : Text;
  };
};
