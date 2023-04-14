namespace WebAPI.MockFactory.Tests.Factory.Interfaces
{
    using WebApi.Controllers;

    public interface IControllerFactory
    {
        PositionsController CreatePositionsController();
    }
}